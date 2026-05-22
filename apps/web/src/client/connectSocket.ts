type SocketMessageHandler<T = unknown> = (data: T, event: MessageEvent) => void;

export function connectSocket<T = unknown>(
  url: string,
  handler: SocketMessageHandler<T>,
): WebSocket {
  const socket = new WebSocket(url);

  socket.addEventListener('message', (event) => {
    const parsedData = JSON.parse(event.data) as T;
    handler(parsedData, event);
  });

  return socket;
}
