import { JitsiMeeting } from "@jitsi/react-sdk";
import { useNavigate } from "react-router-dom";

export default function ({ username }) {
    const navigate = useNavigate();
    return (
        <JitsiMeeting
            roomName="MySambeauAPP"
            configOverwrite={{
                startWithAudioMuted: true,
                disableModeratorIndicator: true,
                hideConferenceSubject: true,
                startScreenSharing: false,
                enableEmailInStats: false,
                startWithVideoMuted: true,
                prejoinPageEnabled: false, // If false: Auto join
            }}
            interfaceConfigOverwrite={{
                DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            }}
            userInfo={{
                displayName: username,
            }}
            onApiReady={(externalApi) => {
                // here you can attach custom event listeners to the Jitsi Meet External API
                // you can also store it locally to execute commands
            }}
            onReadyToClose={() => {
                navigate("/dashboard");
            }}
            getIFrameRef={(iframeRef) => {
                iframeRef.style.height = "100%";
                iframeRef.style.width = "100%";
            }}
        />
    );
}
