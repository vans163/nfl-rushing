defmodule Rush do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    IO.puts("Starting Rush app..")

    {:ok, _} = :application.ensure_all_started(:stargate)

    {:ok, ip} = (System.get_env("IP") || "127.0.0.1")
        |> to_charlist()
        |> :inet.parse_address()
    port = (System.get_env("PORT") || "8080")
        |> :erlang.binary_to_integer()

    IO.puts("Starting webserver on #{inspect ip} #{port}")

    webserver = %{
      ip: ip,
      port: port,
      hosts: %{
        {:http, "*"} => {Rush.Http, %{}}
      }
    }

    {:ok, _Pid} = :stargate.warp_in(webserver)

    children = []

    opts = [
      strategy: :one_for_one,
      name: Run.Supervisor,
      max_seconds: 1,
      max_restarts: 999_999_999_999
    ]

    Supervisor.start_link(children, opts)
  end
end
