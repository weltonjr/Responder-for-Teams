import { MessageActionsPayload } from "botbuilder";
import ProcessCard from "./utils/ProcessCard";

export default function(request, response, next) {
    if (request.method !== "POST" || request.body.type !== "invoke" || request.body.name !== "composeExtension/fetchTask") {
        next();
        return;
    }

    const messagePayload = request.body.value.messagePayload as MessageActionsPayload;

    response.json({
        task: {
            type: "continue",
            value: {
                title: "Responder",
                card: {
                    contentType: "application/vnd.microsoft.card.adaptive",
                    content: {
                        $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                        type: "AdaptiveCard",
                        version: "1.2",
                        body: [
                            {
                                type: "Container",
                                items: ProcessCard(messagePayload),
                                style: "emphasis"
                            },
                            {
                                type: "Container",
                                items: [
                                    {
                                        type: "Input.Text",
                                        id: "resposta",
                                        placeholder: "Resposta",
                                        isMultiline: true
                                    }
                                ]
                            }
                        ],
                        actions: [
                            {
                                type: "Action.Submit",
                                title: "Responder",
                                data: {
                                    id: "unique-id"
                                }
                            }
                        ]
                    }
                }
            }
        }
    });
}
