import React from 'react';
import Styled from 'react-styles-injector';

import { Button } from '@uiComponents/Button';
import styles from './Home.pcss';
import { EAppColors } from '@constants/appColors';
import { Loader } from '@uiComponents/Loader';
import { DataCall } from '@utils/dataLayer';
import { apiRoutes, EAPIRouteKeys } from '@constants/apiRoutes';
import { EUserKeys, IUser } from '@customTypes/user';
import { EProjectKeys, IProject } from '@customTypes/project';
import { clientRoutes, EClientRouteKeys } from '@constants/clientRoutes';
import { mdiAccount, mdiOfficeBuilding } from '@mdi/js';

interface IState {
  isLoading: boolean;
  loadingError?: string;
  users?: Array<IUser>;
  projects?: Array<IProject>;
}

export class Home extends React.Component<unknown, IState> {
  public state: IState = {
    isLoading: true,
  };

  public componentDidMount(): void {
    this.loadData();
  }

  private loadData = async (): Promise<void> => {
    try {
      const { users, projects } = ((
        await DataCall({
          method: apiRoutes[EAPIRouteKeys.GET_HOME_DATA].method,
          path: apiRoutes[EAPIRouteKeys.GET_HOME_DATA].route,
        })
      ).payload as unknown) as {
        users: Array<IUser>;
        projects: Array<IProject>;
      };

      this.setState({
        users,
        projects,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        loadingError: error.message || String(error),
      });
    }
  };

  public render(): JSX.Element {
    const { loadingError, isLoading, users, projects } = this.state;

    return (
      <Styled styles={styles}>
        <header>
          <h1>OkFounder</h1>
          <p>Find the best co-founder for your startup!</p>
          <p>
            We are the largest founders community in Sitka, Alaska... And soon
            in the entire world. Meet incredible people and start shipping soon.
          </p>
        </header>

        <div>
          <h2>Projects looking for founders</h2>
          {!loadingError && isLoading && <Loader label="loading projects..." />}
          {loadingError && <p>Loading error</p>}
          {!isLoading && !loadingError && (
            <ul>
              {projects?.map((project) => (
                <li key={(project[EProjectKeys.ID] as unknown) as string}>
                  <p>
                    Haaaaave you met <b>“{project[EProjectKeys.NAME]}”</b>? This
                    is a project proposed by{' '}
                    <b>
                      “{project[EProjectKeys.FIRSTNAME]}{' '}
                      {project[EProjectKeys.LASTNAME]}”
                    </b>
                    , that can do <b>“{project[EProjectKeys.SKILLSET]}”</b>.
                  </p>
                  <p>
                    It is a <b>“{project[EProjectKeys.TYPE]}”</b>. They aim to
                    solve <b>“{project[EProjectKeys.DESCRIPTION]}”</b>. And they
                    need <b>“{project[EProjectKeys.TARGET]}”</b>.
                  </p>
                  <p>
                    You can contact them on{' '}
                    <b>“{project[EProjectKeys.EMAIL]}”</b>
                    {project[EProjectKeys.LINKEDIN] && (
                      <>
                        {' '}
                        <b>“{project[EProjectKeys.LINKEDIN]}”</b>
                      </>
                    )}
                    .
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2>Founders looking for projects</h2>
          {!loadingError && isLoading && <Loader label="loading founders..." />}
          {loadingError && <p>Loading error</p>}
          {!isLoading && !loadingError && (
            <ul>
              {users?.map((user) => (
                <li key={(user[EUserKeys.ID] as unknown) as string}>
                  <p>
                    Haaaave you met{' '}
                    <b>
                      “{user[EUserKeys.FIRSTNAME]} {user[EUserKeys.LASTNAME]}”
                    </b>
                    ? They can do <b>“{user[EUserKeys.SKILLSET]}”</b>.
                  </p>
                  <p>
                    They would love to work on <b>“{user[EUserKeys.WANT]}”</b>.
                    Because they want <b>“{user[EUserKeys.MOTIVATION]}”</b>. But
                    they surely won’t <b>“{user[EUserKeys.DONTWANT]}”</b>.
                  </p>
                  <p>
                    You can contact them on <b>“{user[EUserKeys.EMAIL]} ”</b>
                    {user[EUserKeys.LINKEDIN] && (
                      <>
                        {' '}
                        <b>“{user[EUserKeys.LINKEDIN]}”</b>
                      </>
                    )}
                    .
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer>
          <Button
            iconLeft={mdiOfficeBuilding}
            label="Post a project"
            href={clientRoutes[EClientRouteKeys.POST_PROJECT].path}
          />
          <Button
            iconLeft={mdiAccount}
            label="Post my profile"
            background={EAppColors.ACCENT_DARK}
            href={clientRoutes[EClientRouteKeys.POST_PROFILE].path}
          />
        </footer>
      </Styled>
    );
  }
}
