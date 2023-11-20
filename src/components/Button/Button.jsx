import styles from "./Button.module.css";

function Button({ text, functionButton, disabled }) {
    return (
        <button onClick={functionButton} disabled={disabled} className={styles.bigButton}>{text}</button>
    )
}

export default Button