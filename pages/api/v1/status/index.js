function status(request, response) {
  response.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}
export default status;
