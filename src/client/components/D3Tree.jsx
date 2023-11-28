import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const D3Tree = ({ data }) => {
  //d3container set to null and useRef to not trigger re-renders when it changes.
  const d3Container = useRef(null);

  useEffect(() => {
    //runs on mount, or whenever data changes, but may change it
    if (data && d3Container.current) {
      let transition = false;
      //set transition to false before
      //svg will select where the tree wil render
      const svg = d3.select(d3Container.current);
      svg.selectAll('*').remove();
      //select all removes any other content to redraw the tree
      //margin width height, dimensions for the d3tree
      const margin = { top: 20, right: 20, bottom: 30, left: 200 };
      const width = 960 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;
      //g = groups, appends g to the svg and it will be positioned according to the given margins
      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      //set i to identify nodes later on and will convert the hierarchical data into a d3 hierarchy
      const tree = d3.tree().size([height, width]);
      let i = 0;
      const root = d3.hierarchy(data, (d) => d.children);
      root.x0 = height / 2;
      root.y0 = 0;

      // Initially collapse all children of root's children --collapse
      root.children?.forEach(collapse);

      update(root);

      //collapses all the nodes by mobing the children to _children
      function collapse(d) {
        if (d.children) {
          d._children = d.children;
          d._children.forEach(collapse);
          d.children = null;
        }
      }
      //begin the update for the tree
      //treeData is the the root, which contains all of the info of the tree
      //node and links are arrays, that rep the nodes and the connections
      //descendants are the children, links are what connect them
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
        //
        let nodeEnter = node
          .enter()
          .append('g')
          .attr('class', 'node')
          .attr('transform', (d) => `translate(${source.y0},${source.x0})`)
          .on('click', click);

        nodeEnter
          .append('circle')
          .attr('r', 10)
          .style('fill', (d) => (d._children ? '#ff8c00' : '#a9a9a9'));

        nodeEnter
          .append('text')
          .attr('dy', '.35em')
          .attr('x', (d) => (d.children || d._children ? -13 : 13))
          .style('text-anchor', (d) =>
            d.children || d._children ? 'end' : 'start'
          )
          .text((d) => d.data.name);
        //basically all styling of teh nodes and how they enter
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
        //curved paths for display purposes, could be straight or stepped i think

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
