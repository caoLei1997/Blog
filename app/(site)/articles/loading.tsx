import Image from 'next/image'

export default function loading() {
  return (
    <div className="flex flex-col items-center justify-center mt-24">
        <Image src="/img/loading2.gif" alt="loading" width={100} height={100}/>
        加载中...
    </div>
  )
}
