import {FC} from "react";
import {AvatarWithInfo} from "./AvatarWithInfo";
import "./../../App.css";

export const AvatarWithInfoList: FC = () => {
    return (
        <div className="flexWrapper">
            <div className="flexContainer">
                <AvatarWithInfo
                    imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjN68kEfXRgeGWTS8I5S01p9GD5ljIDek91Q&s"
                    firstName="Nicola"
                    lastName="Harris"
                    userCardSize="32"
                    isClickable
                    email="nicolaharris@rubikui.com"
                    isOnlineIndicator={false}
                />
                <AvatarWithInfo
                    imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjN68kEfXRgeGWTS8I5S01p9GD5ljIDek91Q&s"
                    firstName="Nicola"
                    lastName="Harris"
                    userCardSize="40"
                    // isClickable
                    uiType="fill"
                    email="nicolaharris@rubikui.com"
                />
                <AvatarWithInfo
                    imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjN68kEfXRgeGWTS8I5S01p9GD5ljIDek91Q&s"
                    firstName="Nicola"
                    lastName="Harris"
                    userCardSize="48"
                    isClickable
                    uiType="fill"
                    email="nicolaharris@rubikui.com"
                />
                <AvatarWithInfo
                    // image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjN68kEfXRgeGWTS8I5S01p9GD5ljIDek91Q&s"
                    firstName="Nicola"
                    lastName="Harris"
                    userCardSize="56"
                    isClickable
                    isOnlineIndicator={false}
                    uiType="fill"
                    email="nicolaharris@rubikui.com"
                />
            </div>
        </div>
    );
};
