import * as React from "react";
import { connect, Dispatch } from "react-redux";
import config from "../../config";
import { logoutAction } from "../../sagas/auth";
import { RootState } from "../../stores/reducers";
import { withDefaultProps } from "../../utils/withDefaultProps";

const greetingWord = config.greetingWord;

const defaultProps = {
  logout: () => undefined as any,
  username: "world"
};
type Props = Partial<typeof defaultProps>;

export const Main: React.SFC<Props> = ({ username, logout }) => (
  <div>
    {`${greetingWord} ${username || "World"}`}
    <button onClick={logout}>
      Logout <span className="i-react" />
    </button>
  </div>
);

export const MainWithDefaultProps = withDefaultProps(defaultProps, Main);

const mapStateToProps = (state: RootState) => ({ username: state.auth.username });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(logoutAction())
});

export const connectedMainPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainWithDefaultProps);

export default connectedMainPage;
