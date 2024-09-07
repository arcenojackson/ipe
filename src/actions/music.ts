export async function getMusics() {
  const response = await fetch('http://localhost:3000/api/musics')
  const result = await response.json()
  return result.data
}
