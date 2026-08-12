import {
  ClickTimer,
  DebouncedLogger,
  FocusTracker,
  PreviousInput,
  WebSocketLogger,
} from 'features/ref-exmaples'

import styles from './RefExamplesPage.module.css'

export const RefExamplesPage = () => {
  return (
    <div className={styles.refExamplesPage}>
      <h1 className={styles.title}>Примеры useRef</h1>
      <ClickTimer />
      <PreviousInput />
      <FocusTracker />
      <DebouncedLogger />
      <WebSocketLogger />
    </div>
  )
}
