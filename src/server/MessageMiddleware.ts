import { MessageActionsPayload } from "botbuilder";
import ProcessCard from "./utils/ProcessCard";

export default function(request, response, next) {
    if (request.method !== "POST" || request.body.type !== "message") {
        next();
        return;
    }

    response.json({});
}
