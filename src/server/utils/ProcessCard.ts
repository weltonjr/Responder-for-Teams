import { MessageActionsPayload } from "botbuilder";

export default function ProcessCard(messagePayload: MessageActionsPayload) {
    return [
        {
            type: "TextBlock",
            text: messagePayload.from?.user?.displayName ?? "",
            wrap: false,
            size: "Small",
            weight: "Bolder",
            color: "Accent"
        },
        {
            type: "TextBlock",
            text: new Date(messagePayload.createdDateTime ?? "").toLocaleString(),
            height: "stretch",
            wrap: false,
            spacing: "None",
            size: "Small",
            weight: "Bolder",
            color: "Accent",
            isSubtle: true
        },
        {
            type: "TextBlock",
            text: messagePayload.body?.content ?? "",
            wrap: true,
            size: "Small"
        }
    ];
}
