import { EventData, EventType } from "@/types/events";
import { Badge } from "../ui/badge";
import ActivityIcon from "../activity/activity-icon";
import { formatDistanceStrict } from "date-fns";
import ActivityUserAvatar from "../activity/activity-user-avatar";
import ActivityUserName from "../activity/activity-user-name";

export default function Label({
  event,
  type,
}: {
  event: EventData;
  type: EventType;
}) {
  const data = event[type].data;
  // Ask about tweet?!? function literal
  const isMultiple = Array.isArray(data) && data.length > 1;
  const text = `${event.type === "labels-create" ? "added tag" : "removed tag"}${isMultiple ? "s" : ""
    }`;
  return (
    <div className="relative flex items-start space-x-3">
      <div className="relative px-1">
        <ActivityIcon name="label" />
      </div>
      <div className="min-w-0 flex-1 py-0 flex">
        <div className="h-8 flex items-center mr-1">
          <ActivityUserAvatar user={event.user} />
        </div>
        <div className="text-sm leading-7 text-muted-foreground">
          <span className="mr-0.5">
            <ActivityUserName user={event.user} />{" "}
            {text}
          </span>{" "}
          {/* TODO: check if space-x-* is working */}
          <span className="mr-0.5 space-x-0.5">
            {Array.isArray(data) ? (
              data.map((d) => (
                <a href="#" key={d}>
                  <Badge variant="outline">{d}</Badge>
                </a>
              ))
            ) : (
              <a href="#">
                <Badge variant="outline">{data}</Badge>
              </a>
            )}{" "}
          </span>
          <span className="whitespace-nowrap">
            {formatDistanceStrict(new Date(event.timestamp), new Date())} ago
          </span>
        </div>
      </div>
    </div>
  );
}
