export const Image = (props) => {
  const { url } = props
  return (
    <div>
      <img src={url} alt="画像" />
    </div>
  )
}
