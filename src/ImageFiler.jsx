import { useState } from "react";

function ImageFiler(){
    const [list, setList] = useState(['Eat',"Run","Break"])

 
    
    return(
        <div>
        {list && (list.map(ls =>(<p>{ls}</p>)))}
        <ul>{list.map(ls =>(<p>{ls}</p>))}</ul>
        </div>
        
    )
    
}

export default ImageFiler;

