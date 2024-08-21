import React from 'react';
import { Helmet } from 'react-helmet';
 

function SimpleBlog() {

    const data = [
        {
            "type":"p",
            "content":"Hi Hello Everyone",
        },
        {
            "type":"h2",
            "content":"This is heading",
        }
    ]
    const renderContent = (data) =>{
        switch(data.type){
            case 'p':
                return <p>{data.content}</p>;
                break;
            case "h2":
                return <h2>{data.content}</h2>
                break;
            default:
                return <p>{data.content}</p>;
                break;
        }
            }
           

  return (
    <div>
        <Helmet>
            <title>My Page</title>
            <meta name="description" content="This is a description of my page" />
        </Helmet>

      {data.map(d => (
        <div >
            {renderContent(d)}
        </div>
      ))}
    </div>
  )
}

export default SimpleBlog
