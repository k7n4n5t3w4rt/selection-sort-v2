# Selection-Sort

### NOTES:

#### SelectionSort:

Takes in Grid and returns it with props:

```
```

Used thus:

```
<SelectionSort containerId="selection-sort" display={<Grid>} )
```

#### Grid:

type FinishCounter = {
ALGORITHMS: [],
COUNT: number
}

```
type Props = {
  CONTAINER: HTMLElement,
  display: React.Component<any>,
  algorithm: {
    run: () => mixed
  },
  SHOW_WORKING?: boolean,
  FPS?: number,
  ACCELLERATION?: number,
  MAX_SECONDS_TRANSITION_INTERVAL?: number,
  COLS?: number,
  ROWS?: number,
  LOOP?: boolean,
  RELOAD_INTERVAL?: number,
  CONSTANT_TRANSITION_SPEED?: boolean,
  FINISH_COUNTER?: finishCounter
  }
```

```
<div id={props.containerId} className="viz">
  {props.children}
</div>
```

#### Grid:

<SelectionSort>
