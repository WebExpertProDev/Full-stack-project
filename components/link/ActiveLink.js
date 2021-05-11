import { withRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";
import cx from "classnames";

const ActiveLink = withRouter(({ router, children, className, notActive, ...props }) => (
    <Link {...props}>
        {React.cloneElement(Children.only(children), {
            className: cx(router.pathname === props.href && !notActive ? `active` : null, className)
        })}
    </Link>
));

export default ActiveLink;
