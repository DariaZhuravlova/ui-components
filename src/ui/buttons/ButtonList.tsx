import {Button} from "./ui/buttons/Button";

export const ButtonList = () => {
    const uiTypes = ["fill", "outline", "ghost", "text"];
    const uiColors = ["accent", "primary", "secondary", "success", "danger", "warning"];
    return (
        <div className="button-list">
            <div className="button-flex-container">
                {uiTypes.map((type) => (
                    <div
                        key={type}
                        className="row"
                    >
                        {uiColors.map((color) => (
                            <Button
                                key={`${color}-${type}`}
                                uiType={type}
                                uiColor={color}
                                leftIcon
                                rightIcon
                            >
                                Button textеееееееее
                            </Button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
