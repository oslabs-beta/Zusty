# Zusty

Zusty is a Zustand Dev Tool designed to facilitate the debugging of state management in your applications. It provides state snapshots, action logs, render time metrics, and a component tree showing which components are using state. With this information at hand debugging your Zustand code is easy!

## Installation

Use the package manager to install our middleware - zustymiddleware.

```bash
npm i zustymiddleware
```

## Usage

1. Import zustymiddleware at the top of your store file
2. Wrap your store in the middleware
3. Before you export your store, add window.store = < your store name>

```javascript
import zustymiddleware from 'zustymiddleware';

const useStore = create(
  zustymiddleware((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
  }))
);

window.store = useStore;
export default useStore;
```

Next, download the Zusty Chrome extension: link here

You are now ready to use our tool!

## Features

Upon opening Zusty you will see the action log, as well as state snapshots. Our state snapshot section features a toggle which allows users to switch between a JSON view and a list view depending on what is most convenient. The JSON view allows for easy visualization for nested objects, as well as the ability to collapse items to focus on what is being affected. A timestamp has been added to each snapshot so users can understand when each state change is occurring for debugging:

![StateSnapShot](https://github.com/oslabs-beta/Zusty/assets/44410674/dd19234b-04a0-4788-b58f-1a37401d8ef8)


A tree button is available, displaying all the components in the user's application in a convenient tree-like view, enabling a comprehensive overview of the application's state management structure and facilitating efficient debugging and identification of data flow patterns:

![Tree](https://github.com/oslabs-beta/Zusty/assets/44410674/2ee22878-ec2e-4be0-b510-62f72b62a2be)


To visualize the action log, time travel, and metrics select the action log button.

Here you can see each action that is changing state, the state before and after that action was completed, and the render time to update state after this action. Zusty adds dynamic highlighting to make it clear which action is being inspected when viewing previous and current state:

![ActionLogTimeTravel](https://github.com/oslabs-beta/Zusty/assets/44410674/5e0f767d-df34-4d28-bf84-e4e04117f3c8)


On each action we display either a green, yellow, or red dot indicating the performance of rendering times. We have a toggle option which users can select to see the exact render time to understand which actions are leading to issues if any:

![ActionLogMetrics](https://github.com/oslabs-beta/Zusty/assets/44410674/ff2d36b5-7947-4c71-85b5-2252f0f00516)


There is also a store button that allows the user to conveniently see thier zustand store directly in the dev tool, as to see how these actions are actually affecting the state:

![Store](https://github.com/oslabs-beta/Zusty/assets/44410674/17fc81c9-ee4f-440b-b5dd-c4f816e82568)


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## Our Team

- Adrian Insingo | Github: [@adrianinsingo](https://github.com/adrianinsingo)
- Brian JaeKook Lee | Github: [@JaeBrian](https://github.com/JaeBrian)
- Dana Kaplan | Github: [@DanaKaplan944](https://github.com/DanaKaplan944)
- Nancy Huang | Github: [@itsnancyhuang](https://github.com/itsnancyhuang)
- William Kil | Github: [@shinykoin](https://github.com/shinykoin)

## License

[MIT](https://choosealicense.com/licenses/mit/)
