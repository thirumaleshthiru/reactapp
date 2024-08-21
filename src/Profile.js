function Profile(props) {
     
  
   
  
    return (
      <>
        <div className="cards">
          {props.data.map((item, index) => (
            <div className="card" key={index}>
              <img src={item.image} alt={item.name} className="profile" />
              <h1>{item.name}</h1>
              <p>{item.age}</p>
              <p>{item.job}</p>
            </div>
          ))}
        </div>
      </>
    );
  }
  
  export default Profile;
  