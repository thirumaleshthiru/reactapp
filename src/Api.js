import { useState } from "react";

function Api() {
    const [data, setData] = useState(null);
    const [url, setUrl] = useState("");

    const handleInput = (e) => {
        setUrl(e.target.value);
    };

    const handleDownload = () => {
        if (!url) {
            setData(null);
            return;
        }

        setData("Loading");

        fetch(`https://nice-gray-barnacle-yoke.cyclic.app/getInstagramData?url=${url}`)
            .then(response => response.json())
            .then(data => {
                  
                    if (data.length > 0 && !data.error ) {
                        setData(data);
                    } else {
                        setData("Error Occurred");
                    }
                 
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setData("Error Occurred");
            });
    };

    return (
        <>
            <input
                name="url"
                value={url}
                type="text"
                onChange={handleInput}
            />
            <button onClick={handleDownload}>Download</button>

{Array.isArray(data) && data.length > 0 && !data[0].error ?  
<a href={data[0].download_link} target="_blank" rel="noopener noreferrer">Download Now</a>
: 
<p>{data}</p>
}

        </>
    );
}

export default Api;
