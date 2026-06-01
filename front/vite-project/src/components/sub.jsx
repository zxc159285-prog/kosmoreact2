import {useEffect, useState} from "react";

function Test(){
    const[count,setCount]=useState(1)

    useEffect(() => {
        console.log("useEffect 사용")
    },[]);

    function fn(){
        setCount(count+1)
    }

    return (
        <div>
        <h3>Test Page</h3>
            <button onClick={fn}>Click</button>
            <div>{count}</div>
        </div>
    )
}
export default Test;