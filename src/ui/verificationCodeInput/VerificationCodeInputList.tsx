import {VerificationCodeInput} from "./VerificationCodeInput";

export const VerificationCodeInputList = () => {
    const handleComplete = (code: string) => {
        console.log("Entered code:", code);
    };

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "start", gap: "20px", padding: "50px"}}>
            <div style={{display: "flex",alignItems: "start", gap: "20px"}}>
                <VerificationCodeInput
                    title="Secure code"
                    helperText="This is a hint text to help user."
                    length={4}
                    size="small"
                    onComplete={handleComplete}
                />
                <VerificationCodeInput
                    title="Secure code"
                    helperText="This is a hint text to help user."
                    length={4}
                    size="medium"
                    onComplete={handleComplete}
                />
                <VerificationCodeInput
                    title="Secure code"
                    helperText="This is a hint text to help user."
                    length={4}
                    size="large"
                    onComplete={handleComplete}
                />
            </div>
            <div style={{display: "flex", flexDirection: "column", alignItems: "start", gap: "20px"}}>
                <VerificationCodeInput
                    title="Secure code"
                    helperText="This is a hint text to help user."
                    length={6}
                    size="small"
                    onComplete={handleComplete}
                />
                <VerificationCodeInput
                    title="Secure code"
                    helperText="This is a hint text to help user."
                    length={6}
                    size="medium"
                    onComplete={handleComplete}
                />
                <VerificationCodeInput
                    title="Secure code"
                    helperText="This is a hint text to help user."
                    length={6}
                    size="large"
                    onComplete={handleComplete}
                    disabled={true}
                />
            </div>
        </div>
    );
};


