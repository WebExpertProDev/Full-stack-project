{
  rules: {
    "react/react-in-jsx-scope",
      "jsx-a11y/anchor-is-valid"[
        ("error",
        {
          components: ["Link"],
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"]
        })
      ]
  }
}
