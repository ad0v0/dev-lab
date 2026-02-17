export const ErrorStateView = ({ message, onRetry }) => {
  return (
    <div className="error-state">
      <p>Something went wrong:</p>
      <p className="error-message">{message}</p>
      <button onClick={onRetry}>Click to retry</button>
    </div>
  )
}