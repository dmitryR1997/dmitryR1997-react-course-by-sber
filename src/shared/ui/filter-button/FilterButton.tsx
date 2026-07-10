import styles from './FilterButton.module.css'

interface FilterButtonProps {
  label: string
  value: string
  active?: boolean
  onClick: (value: string) => void
}

export const FilterButton = ({ label, value, active = false, onClick }: FilterButtonProps) => {
  const handleClick = () => {
    onClick(value)
  }

  return (
    <button
      className={`${styles.filterButton} ${active ? styles.active : ''}`}
      onClick={handleClick}
    >
      {label}
    </button>
  )
}
