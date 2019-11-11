defmodule Rush.Http do
    def http(:'GET', path, _q, h, _, s) do
        path = cond do
            path == "/" -> "index.html"
            path == "" -> "index.html"
            true -> path
        end
        :stargate_static_file.serve_static("./priv/panel/build/", path, h, s)
    end
end