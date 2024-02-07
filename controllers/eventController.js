const assert = require("assert");
const Definer = require("../lib/error");
const Event = require("../models/Event");

const eventController = {
  addNewEvent: async (req, res) => {
    try {
      console.log("POST: cont/addNewEvent");
      assert(req.file, Definer.general_err3);
      const event = new Event();
      const data = req.body;
      // data.event_image = req?.file?.path.replace(/\\/g, "/");

        data.event_image = req.files.map((ele) => {
            return ele.path;
        });

      const result = await event.addNewEventData(data, req.member);

      const html = `<script> alert("New Event added successfully");
      window.location.replace('/house/events/menu')</script>`;
      res.end(html);
    } catch (err) {
      console.log(`ERROR, cont/addNewEvent, ${err.message}`);
    }
  },

  updateChosenEvent: async (req, res) => {
    try {
      console.log("POST: cont/updateChosenEvent");
      const event = new Event();
      const id = req.params.id;
      const result = await event.updateChosenEventData(
        id,
        req.body,
        req.member._id
      );
      res.json({ state: "success", data: result });
    } catch (err) {
      console.log(`ERROR, cont/updateChosenEvent, ${err.message}`);
      res.json({ state: "fail", message: err.message });
    }
  },

  getCompanyEvents: async (req, res) => {
    try {
      console.log(`GET: cont/getCompanyEvents`);

      const { member, query } = req;
      const event = new Event();
      const result = await event.getCompanyEventsData(member, query);

      assert.ok(result, Definer.general_err1);

      res.json({ state: "success", data: result });
    } catch (err) {
      console.log(`ERROR, cont/geCompanyEvents, ${err.message}`);
      res.json({ state: "fail", message: err.message });
    }
  },
};
module.exports = eventController;
