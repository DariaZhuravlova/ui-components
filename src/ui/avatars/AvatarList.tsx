import {Avatar} from "./Avatar";
import "./../../App.css";

export const AvatarList = () => {
    const sizes = [16, 24, 28, 32, 36, 40, 44, 48, 56];
    const indicators = [true, false];
    return (
        <div className="flexWrapper">
            <div className="flexContainer">
                {indicators.map((isOnlineIndicator) => (
                    <div
                        key={String(isOnlineIndicator)}
                        className="flexRow"
                    >
                        {sizes.map((size) => (
                            <Avatar
                                key={`${size}-${isOnlineIndicator}`}
                                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjN68kEfXRgeGWTS8I5S01p9GD5ljIDek91Q&s"
                                firstName="Nicola"
                                lastName="Harris"
                                size={String(size)}
                                isOnlineIndicator={isOnlineIndicator}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className="flexContainer">
                {indicators.map((isOnlineIndicator) => (
                    <div
                        key={String(isOnlineIndicator)}
                        className="flexRow"
                    >
                        {sizes.map((size) => (
                            <Avatar
                                key={`${size}-${isOnlineIndicator}`}
                                firstName="Nicola"
                                lastName="Harris"
                                size={String(size)}
                                isOnlineIndicator={isOnlineIndicator}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
