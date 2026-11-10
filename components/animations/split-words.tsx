import { Fragment } from "react";

// "\n" quebra a linha só no desktop (lg+); "|" quebra só abaixo de lg.
export function SplitWords({ text, attr = "data-word" }: { text: string; attr?: string }) {
  const tokens = text.split(/([ \n|])/).filter(Boolean);
  return (
    <>
      {tokens.map((token, index) => {
        if (token === " ") return <Fragment key={index}> </Fragment>;
        if (token === "\n" || token === "|") {
          return (
            <Fragment key={index}>
              {" "}
              <br className={token === "\n" ? "hidden lg:block" : "lg:hidden"} />
            </Fragment>
          );
        }
        return (
          <span key={index} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span className="inline-block" {...{ [attr]: "" }}>
              {token}
            </span>
          </span>
        );
      })}
    </>
  );
}
