// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const D3Tree = ({ data }) => {
//   const d3Container = useRef(null);

//   useEffect(() => {
//     if (data && d3Container.current) {
//       const svg = d3.select(d3Container.current);
//       svg.selectAll('*').remove();

//       const margin = { top: 20, right: 20, bottom: 30, left: 200 };
//       const width = 660 - margin.left - margin.right;
//       const height = 500 - margin.top - margin.bottom;
//       //set up d3 tree layour
//       //write the d3 tree setup node
//       //use svg var to draw the tree
//       //dependency is [data], if data changes
//       const g = svg
//         .append('g')
//         .attr('transform', `translate(${margin.left},${margin.top})`);

//       // Create the tree layout
//       const tree = d3.tree().size([height, width]);

//       const root = d3.hierarchy(data);

//       tree(root);

//       g.selectAll('.link')
//         .data(root.links())
//         .enter()
//         .append('path')
//         .attr('class', 'link')
//         .style('stroke', '#FFC0CB')
//         .style('stroke-width', '2px')
//         .style('fill', 'none')
//         .attr('d', linePath)
//         .attr(
//           'd',
//           d3
//             .linkHorizontal()
//             .x((d) => d.y)
//             .y((d) => d.x)
//         );

//       // Nodes
//       const nodes = g
//         .selectAll('.node')
//         .data(root.descendants())
//         .enter()
//         .append('g')
//         .attr('class', 'node')
//         .attr('transform', (d) => `translate(${d.y},${d.x})`);

//       nodes
//         .append('circle')
//         .attr('r', 8)
//         .style('stroke', '#369')
//         .style('stroke-width', '2px')
//         .style('fill', (d) => {
//           const scale = d3.scaleOrdinal(d3.schemeCategory10);
//           return scale(d.depth);
//         });

//       nodes
//         .append('text')
//         .attr('dy', '0.35em')
//         .attr('x', (d) => (d.children ? -13 : 13))
//         .style('text-anchor', (d) => (d.children ? 'end' : 'start'))
//         .attr('fill', '#00000')
//         .text((d) => d.data.name);

//       const r = 8;

//       // Function to calculate the start and end points for the lines
//       function linePath(d) {
//         // Calculate the direction from the source to the target
//         const deltaX = d.target.y - d.source.y;
//         const deltaY = d.target.x - d.source.x;
//         const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
//         const normX = deltaX / dist;
//         const normY = deltaY / dist;

//         // Calculate the start and end points
//         const sourceX = d.source.y + r * normX;
//         const sourceY = d.source.x + r * normY;
//         const targetX = d.target.y - r * normX;
//         const targetY = d.target.x - r * normY;

//         // Return the path for a straight line
//         return `M${sourceX},${sourceY}L${targetX},${targetY}`;
//       }
//     }
//   }, [data]);

//   return <svg width={960} height={500} ref={d3Container} />;
// };

// export default D3Tree;

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const D3Tree = ({ data }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      let transition = false;
      const svg = d3.select(d3Container.current);
      svg.selectAll('*').remove();

      const margin = { top: 20, right: 20, bottom: 30, left: 200 };
      const width = 960 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const tree = d3.tree().size([height, width]);
      let i = 0;
      const root = d3.hierarchy(data, (d) => d.children);
      root.x0 = height / 2;
      root.y0 = 0;

      // Initially collapse all children of root's children
      root.children?.forEach(collapse);

      update(root);

      function collapse(d) {
        if (d.children) {
          d._children = d.children;
          d._children.forEach(collapse);
          d.children = null;
        }
      }

      function update(source) {
        transition = true;
        const treeData = tree(root);
        const nodes = treeData.descendants();
        const links = treeData.links();

        // Normalize for fixed-depth
        nodes.forEach((d) => (d.y = d.depth * 180));

        // Nodes
        let node = g
          .selectAll('.node')
          .data(nodes, (d) => d.id || (d.id = ++i));

        let nodeEnter = node
          .enter()
          .append('g')
          .attr('class', 'node')
          .attr('transform', (d) => `translate(${source.y0},${source.x0})`)
          .on('click', click);

        nodeEnter
          .append('circle')
          .attr('r', 8)
          .style('fill', (d) => (d._children ? '#ff8c00' : '#a9a9a9'));

        nodeEnter
          .append('text')
          .attr('dy', '.35em')
          .attr('x', (d) => (d.children || d._children ? -13 : 13))
          .style('text-anchor', (d) =>
            d.children || d._children ? 'end' : 'start'
          )
          .text((d) => d.data.name);

        // Update the nodes
        const nodeUpdate = nodeEnter.merge(node);

        nodeUpdate
          .transition()
          .duration(750)
          .attr('transform', (d) => `translate(${d.y},${d.x})`)
          .on('end', () => (transition = false));

        // Remove any exiting nodes
        const nodeExit = node
          .exit()
          .transition()
          .duration(750)
          .attr('transform', (d) => `translate(${source.y},${source.x})`)
          .remove();

        // Links
        const link = g.selectAll('.link').data(links, (d) => d.target.id);

        // Enter any new links at the parent's previous position
        const linkEnter = link
          .enter()
          .insert('path', 'g')
          .attr('class', 'link')
          .attr('fill', 'none')
          .attr('d', (d) => {
            const o = { x: source.x0, y: source.y0 };
            return diagonal(o, o);
          });

        // Update the links
        const linkUpdate = linkEnter.merge(link);

        linkUpdate
          .transition()
          .duration(750)
          .attr('d', (d) => diagonal(d.source, d.target));

        // Remove any exiting links
        link
          .exit()
          .transition()
          .duration(750)
          .attr('d', (d) => {
            const o = { x: source.x, y: source.y };
            return diagonal(o, o);
          })
          .remove();

        // Stash the old positions for transition
        nodes.forEach((d) => {
          d.x0 = d.x;
          d.y0 = d.y;
        });

        // Creates a curved (diagonal) path from parent to the child nodes
        function diagonal(s, d) {
          return `M ${s.y} ${s.x}
                  C ${(s.y + d.y) / 2} ${s.x},
                    ${(s.y + d.y) / 2} ${d.x},
                    ${d.y} ${d.x}`;
        }

        // Toggle children on click
        function click(event, d) {
          console.log('check', transition);
          if (transition) return;
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
          update(d);
        }
      }
    }
  }, [data]); // Redraw tree if data changes

  return <svg width={960} height={500} ref={d3Container} />;
};

export default D3Tree;
