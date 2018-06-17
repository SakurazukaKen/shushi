import * as React from "react";
const { PureComponent } = React;
import { connect } from "react-redux";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";
import { AuthState } from "../../stores/auth/auth.reducer";
import { RootState } from "../../stores/reducers";

interface IPrivateRouteProps {
  auth: AuthState;
}
type RestProps = Pick<RouteProps, Exclude<keyof RouteProps, keyof IPrivateRouteProps>>;

type Props = IPrivateRouteProps & RestProps;

class UnconnectedPrivateRoute extends PureComponent<Props> {
  innerRender = (props: RouteComponentProps<any>) => {
    const {
      auth: { isAuthenticated, isFetching },
      render,
      component: Component
    } = this.props;
    return isFetching ? null : (
      isAuthenticated ? (
        Component ? (
          <Component {...props} />
        ) : render ? (
          render(props)
        ) : null
      ) : (
        <Redirect to={"/login"} />
      )
    ) ;
  };
  render() {
    const { auth, children, render, component, ...rest } = this.props;
    return (
      <Route {...rest} render={this.innerRender}>
        {children ? children : undefined}
      </Route>
    );
  }
}
const mapStateToProps = (state: RootState, ownProps: RestProps) => ({
  ...ownProps,
  auth: state.auth
});

export const connectPrivateRoute = connect(mapStateToProps)(UnconnectedPrivateRoute);
export default connectPrivateRoute;
