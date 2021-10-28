import { Wrapper,Content } from "./ApproveNews.styles";
import TempApproveImg from '../../../image/temp_approve.jpg';
const ApproveNews=()=>{
    return(
        <>
            <Wrapper>
                <Content>
                    <h2>ApproveNews</h2>
                    <img className="img" src={TempApproveImg} alt="tempimg"/>
                    <hr/>
                    <div className="footer-approve row">
                        <button className="no"><i class="fas fa-times icon"></i>Decline</button>
                        <button className="yes"><i class="fas fa-check icon"></i>Approve</button>    
                    </div>
                    
                </Content>
            </Wrapper>
        </>
    )
};
export default ApproveNews