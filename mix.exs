defmodule Rush.Mixfile do
  use Mix.Project

  def project,
    do: [
      app: :rush,
      version: "0.0.1",
      elixir: "~> 1.9",
      build_embedded: Mix.env() == :prod,
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]

  def application,
    do: [
      applications: [:logger],
      mod: {Rush, []}
    ]

  def deps,
    do: [
      {:exjsx, "~> 4.0.0"},
      {:stargate, git: "https://github.com/vans163/stargate.git"}
    ]
end
