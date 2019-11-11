defmodule Rush do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    IO.puts("Starting Rush app..")

    IO.puts("Starting webserver..")
    {:ok, _} = :application.ensure_all_started(:stargate)

    webserver = %{
      ip: {127, 0, 0, 1},
      port: 8080,
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
