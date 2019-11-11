defmodule Rush.Http do
  def headers_json(headers) do
    Map.merge(headers, %{"Content-Type" => "application/json"})
  end

  def headers_cors(headers) do
    Map.merge(
      headers,
      %{
        "Access-Control-Allow-Origin" => "*",
        "Access-Control-Allow-Methods" => "GET, POST, HEAD, PUT, DELETE",
        "Access-Control-Allow-Headers" =>
          "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
      }
    )
  end

  def http(:GET, "/rushing.json", _q, h, _, s) do
    rushing = File.read!("./priv/rushing.json")
    json_str = JSX.encode!(rushing)

    {code, headersReply, binReply, s} =
      :stargate_plugin.serve_static_bin(json_str, h, s)

    headersReply =
      headersReply
      |> headers_json()
      |> headers_cors()

    {code, headersReply, binReply, s}
  end

  def http(:GET, path, _q, h, _, s) do
    path =
      cond do
        path == "/" -> "index.html"
        path == "" -> "index.html"
        true -> path
      end

    :stargate_static_file.serve_static("./priv/panel/build/", path, h, s)
  end
end
