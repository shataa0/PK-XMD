module.exports = {
  rejectCall: async (conn, json) => {
    try {
      const callerId = json[0]?.from;
      if (!callerId) return;

      // Send warning message
      await conn.sendMessage(callerId, {
        text: '❌ Calling the bot is not allowed. You will be blocked.',
      });

      // Reject call
      await conn.rejectCall(json[0].id, callerId);

      // Block user
      await conn.updateBlockStatus(callerId, "block");
    } catch (err) {
      console.error("❌ Error in anticall reject:", err);
    }
  }
};
