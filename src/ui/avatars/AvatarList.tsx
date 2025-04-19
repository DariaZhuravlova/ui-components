import {Avatar} from "./Avatar";
import "./../../App.css";

export const AvatarList = () => {
    return (
        <div className="flexWrapper">
            <div className="flexContainer">
                <div className="flexRow">
                    <Avatar
                        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjN68kEfXRgeGWTS8I5S01p9GD5ljIDek91Q&s"
                        firstName="Nicola"
                        lastName="Harris"
                        size="24"
                        isOnlineIndicator={true}
                    />
                </div>
            </div>
            <div className="flexContainer">
                <div className="flexRow">
                    <Avatar
                        firstName="Nicola"
                        lastName="Harris"
                        size="32"
                        isOnlineIndicator={false}
                    />
                </div>
            </div>
        </div>
    );
};
