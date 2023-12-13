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

![StateSnapShot](https://github.com/oslabs-beta/Zusty/assets/44410674/b1831e67-0b11-4ac6-b246-e99b43ad33a9)


A tree button is available, displaying all the components in the user's application in a convenient tree-like view, enabling a comprehensive overview of the application's state management structure and facilitating efficient debugging and identification of data flow patterns:

![Tree](https://github.com/oslabs-beta/Zusty/assets/44410674/73aea79b-dbe5-477e-ad01-de9f46645561)


To visualize the action log, time travel, and metrics select the action log button.

Here you can see each action that is changing state, the state before and after that action was completed, and the render time to update state after this action. Zusty adds dynamic highlighting to make it clear which action is being inspected when viewing previous and current state:

![ActionLogTimeTravel](https://github.com/oslabs-beta/Zusty/assets/44410674/611f61f0-e50c-4159-84f9-6e797adc4791)


On each action we display either a green, yellow, or red dot indicating the performance of rendering times. We have a toggle option which users can select to see the exact render time to understand which actions are leading to issues if any:

![ActionLogMetrics](https://github.com/oslabs-beta/Zusty/assets/44410674/ed336c59-b0af-421b-bc67-80a8deee9727)


There is also a store button that allows the user to conveniently see thier zustand store directly in the dev tool, as to see how these actions are actually affecting the state:

![Store](https://github.com/oslabs-beta/Zusty/assets/44410674/f082d5f8-a8d4-4853-bbd7-7bb1fc4bd893)



If you would like to test out these features using the demo application you can access the github repository here!
https://github.com/DanaKaplan944/zustand-demo


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## Our Team

- Adrian Insingo | Github: [@adrianinsingo](https://github.com/adrianinsingo)
- Brian JaeKook Lee | Github: [@JaeBrian](https://github.com/JaeBrian)
- Dana Kaplan | Github: [@DanaKaplan944](https://github.com/DanaKaplan944)
- Nancy Huang | Github: [@itsnancyhuang](https://github.com/itsnancyhuang)
- William Kil | Github: [@shinykoin](https://github.com/shinykoin)

## Check Out Our Website and Node Package
- http://zustydev.com/
- https://www.npmjs.com/package/zustymiddleware

## License

[MIT](https://choosealicense.com/licenses/mit/)
