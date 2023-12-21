

export default function PlaceImg({place,index=0,className=null}) {
    if(!place.photos.length){
        return ''
    }
    if(!className){
      className = "object-cover";
      // h-full w-full object-cover rounded-xl shadow-xl
    }
  return (
    <div>
      <img
        src={"http://localhost:4000/" + place.photos[index]}
        alt=""
        className={className}
      />
    </div>
  );
}
