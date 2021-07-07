import { MessageActionsPayload } from "botbuilder";
import ProcessCard from "./utils/ProcessCard";

export default function(request, response, next) {
    if (request.method !== "POST" || request.body.type !== "invoke" || request.body.name !== "composeExtension/submitAction") {
        next();
        return;
    }

    const messagePayload = request.body.value.messagePayload as MessageActionsPayload;

    response.json({
        composeExtension: {
            type: "result",
            attachmentLayout: "list",
            attachments: [
                {
                    contentType: "application/vnd.microsoft.card.adaptive",
                    content: {
                        type: "AdaptiveCard",
                        body: [
                            {
                                type: "Container",
                                items: ProcessCard(messagePayload),
                                style: "emphasis",
                                bleed: true,
                                selectAction: {
                                    type: "Action.OpenUrl",
                                    url: messagePayload.linkToMessage
                                }
                            },
                            {
                                type: "Container",
                                items: [
                                    {
                                        type: "TextBlock",
                                        text: request.body.value.data?.resposta ?? "Invalid Value",
                                        wrap: true
                                    }
                                ],
                                bleed: true
                            }
                        ],
                        $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                        version: "1.2"
                    }
                }
            ]
        }
    });
}
