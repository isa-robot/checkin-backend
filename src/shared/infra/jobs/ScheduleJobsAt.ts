import { container } from "tsyringe";
import IQueueProvider from "@shared/container/providers/QueueProvider/models/IQueueProvider";

export default function ScheduleJobsAt() {
  const queue = container.resolve<IQueueProvider>("QueueProvider");
  queue.schedule(["UsersAccession", "UsersApprovedNotApproved", "UsersSymptoms"], "tomorrow at 03:00");
}
