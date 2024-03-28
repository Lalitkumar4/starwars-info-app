const PaginateButton = ({ page, setPage, data }) => {
  const debounce = (fn, delay) => {
    let timeout

    return function () {
      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(() => {
        fn()
      }, delay)
    }
  }

  const handleNextClick = () => {
    setPage((old) => (!data || !data.next ? old : old + 1))
  }

  const debounceNextClick = debounce(handleNextClick, 1000)

  return (
    <>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </button>
      <span>{page}</span>
      <button onClick={debounceNextClick} disabled={!data || !data.next}>
        Next
      </button>
    </>
  )
}

export default PaginateButton
