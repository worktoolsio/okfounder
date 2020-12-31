import React from 'react';
import Styled from 'react-styles-injector';
import Router from 'next/router';

import { Input } from '@uiComponents/Input';
import { InputGroup } from '@uiComponents/InputGroup';
import styles from './Post.pcss';
import { Button } from '@uiComponents/Button';
import { mdiAccount, mdiArrowLeft, mdiArrowRight } from '@mdi/js';
import { Icon } from '@uiComponents/Icon';
import { EAppColors } from '@constants/appColors';
import { EUserKeys } from '@customTypes/user';
import { DataCall } from '@utils/dataLayer';
import { apiRoutes, EAPIRouteKeys } from '@constants/apiRoutes';

interface IState {
  isPosting: boolean;
}

export class PostProfile extends React.Component<unknown, IState> {
  public state: IState = {
    isPosting: false,
  };

  private postProfile = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    try {
      this.setState({
        isPosting: true,
      });

      const elements = (event.currentTarget.elements as unknown) as Record<
        string,
        HTMLInputElement
      >;
      const profile = {
        [EUserKeys.FIRSTNAME]: elements[EUserKeys.FIRSTNAME].value,
        [EUserKeys.LASTNAME]: elements[EUserKeys.LASTNAME].value,
        [EUserKeys.EMAIL]: elements[EUserKeys.EMAIL].value,
        [EUserKeys.LINKEDIN]: elements[EUserKeys.LINKEDIN].value,
        [EUserKeys.SKILLSET]: elements[EUserKeys.SKILLSET].value,
        [EUserKeys.WANT]: elements[EUserKeys.WANT].value,
        [EUserKeys.MOTIVATION]: elements[EUserKeys.MOTIVATION].value,
        [EUserKeys.DONTWANT]: elements[EUserKeys.DONTWANT].value,
      };
      await DataCall({
        method: apiRoutes[EAPIRouteKeys.POST_PROFILE].method,
        path: apiRoutes[EAPIRouteKeys.POST_PROFILE].route,
        body: { ...profile },
      });
      alert('Yeah, your did post your profile!');
      Router.push('/');
    } catch (error) {
      alert('Oops, error while posting your profile.');
      this.setState({
        isPosting: false,
      });
    }
  };

  public render(): JSX.Element {
    const { isPosting } = this.state;

    return (
      <Styled styles={styles} tag="form" onSubmit={this.postProfile}>
        <Button
          label="back"
          iconLeft={mdiArrowLeft}
          size="small"
          className="back"
          href="/"
        />

        <h1>
          <Icon icon={mdiAccount} color={EAppColors.PRIMARY_TEXT} width={50} />
          Post your profile
        </h1>

        <p>
          You are looking for an exiting project. Advertise yourself on
          OkFounder.
        </p>

        <InputGroup title="Who are you?">
          <Input
            required
            label="Your first name *"
            placeholder="John"
            name={EUserKeys.FIRSTNAME}
          />
          <Input
            required
            label="Your last name *"
            placeholder="doe"
            name={EUserKeys.LASTNAME}
          />
          <Input
            required
            label="Your email *"
            type="email"
            placeholder="john.doe@mail.com"
            name={EUserKeys.EMAIL}
          />
          <Input
            label="Your LinkedIn URL"
            type="url"
            name={EUserKeys.LINKEDIN}
            placeholder="https://www.linkedin.com/in/john-doe/"
          />
          <Input
            required
            name={EUserKeys.SKILLSET}
            label="Your skillset *"
            placeholder="accounting, python, scrum management..."
          />
        </InputGroup>

        <InputGroup title="What do you want?">
          <Input
            required
            label="The project you want *"
            type="textarea"
            name={EUserKeys.WANT}
          />
          <Input
            required
            label="Your motivation *"
            type="textarea"
            name={EUserKeys.MOTIVATION}
          />
          <Input
            required
            label="What you don't want *"
            type="textarea"
            name={EUserKeys.DONTWANT}
          />
        </InputGroup>

        <p>* required</p>

        <Button
          type="submit"
          background={EAppColors.ACCENT_DARK}
          label="Post my profile"
          iconRight={mdiArrowRight}
          isLoading={isPosting}
        />
      </Styled>
    );
  }
}
