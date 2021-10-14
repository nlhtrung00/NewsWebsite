import react from "react";
import { Wrapper, Content } from "./Profile.styles";
import avatar from '../../../image/cat.jpg';
import addTopicImg from '../../../image/topic.jpg';
import writeNewsImg from '../../../image/postnews.jpg'
import {Link, Routes,Route} from "react-router-dom";



const Profile =() =>{
    return(
        <Wrapper>
            <Content>
                <div className="row info--profile">
                    <div className="avatar"><img src={avatar} /></div>
                    
                    <div className="info">
                        <h2>Nguyễn Hoài Tân</h2>
                        <p>Date of birth: 10/10/2000</p>
                    </div>
                </div>
                <div className="row-flex container-img_function">
                    <div className="img--add">
                        <Link to="/profile/Themchude">
                        
                            <img src={addTopicImg} id="img--add__topic"/>
                            <h4 className="title">Thêm chủ đề bài viết</h4>
                         </Link>
                         
                    </div>
                    <div className="img--add">
                        <Link to="/profile/Thembaiviet">
                        
                            <img src={writeNewsImg} id="img--add__news"/>
                            <h4 className="title">Viết bài</h4>
                         </Link>
                         
                    </div>
                </div>
                
                

            </Content>
        </Wrapper>
    )
}
export default Profile;