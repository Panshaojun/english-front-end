import { useState } from 'react';

const Study = () => {
    const [like, setLike] = useState(1);
    const handleClick = () => {
        setTimeout(() => {
            alert(`you clicked ${like} times`)
        }, 1000)
    }
    return (
        <div>
            <button onClick={() => setLike(like + 1)}>你点击了{like}次</button>
            <button onClick={handleClick}>显示点击次数</button>
        </div>
    )
}
export default Study;