import Tag from './Tag'

const LayoutCard = ({name, image, tags}: {id: number, name: string, image: string, tags: string[]}) => {
  return (
    <div
      onClick={() => console.log('clicked')}
      className='w-full cursor-pointer hover:scale-105 transition-all'
    >
      <img className='rounded-lg' src={image} width="100%" alt="" />
      <p className='pt-2 text-base'>{name}</p>
      <div className='pt-2 flex flex-wrap gap-2'>
        {
          tags.map((tag: string, index: number) => (
            <Tag key={index} title={tag} small={true}/>
          ))
        }
      </div>
    </div>
  )
}

export default LayoutCard