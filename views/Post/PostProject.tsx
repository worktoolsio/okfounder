import React from 'react';
import Styled from 'react-styles-injector';
import Router from 'next/router';

import styles from './Post.pcss';
import { apiRoutes, EAPIRouteKeys } from '@constants/apiRoutes';
import { EAppColors } from '@constants/appColors';
import { EProjectKeys } from '@customTypes/project';
import { mdiArrowLeft, mdiArrowRight, mdiOfficeBuilding } from '@mdi/js';
import { Button } from '@uiComponents/Button';
import { Icon } from '@uiComponents/Icon';
import { Input } from '@uiComponents/Input';
import { InputGroup } from '@uiComponents/InputGroup';
import { DataCall } from '@utils/dataLayer';

interface IState {
  isPosting: boolean;
}

export class PostProject extends React.Component<unknown, IState> {
  public state: IState = {
    isPosting: false,
  };

  private postProject = async (
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
        [EProjectKeys.FIRSTNAME]: elements[EProjectKeys.FIRSTNAME].value,
        [EProjectKeys.LASTNAME]: elements[EProjectKeys.LASTNAME].value,
        [EProjectKeys.EMAIL]: elements[EProjectKeys.EMAIL].value,
        [EProjectKeys.LINKEDIN]: elements[EProjectKeys.LINKEDIN].value,
        [EProjectKeys.SKILLSET]: elements[EProjectKeys.SKILLSET].value,
        [EProjectKeys.DESCRIPTION]: elements[EProjectKeys.DESCRIPTION].value,
        [EProjectKeys.TARGET]: elements[EProjectKeys.TARGET].value,
        [EProjectKeys.TYPE]: elements[EProjectKeys.TYPE].value,
        [EProjectKeys.NAME]: elements[EProjectKeys.NAME].value,
      };
      await DataCall({
        method: apiRoutes[EAPIRouteKeys.POST_PROJECT].method,
        path: apiRoutes[EAPIRouteKeys.POST_PROJECT].route,
        body: { ...profile },
      });
      alert('Yeah, your did post your project!');
      Router.push('/');
    } catch (error) {
      alert('Oops, error while posting your project.');
      this.setState({
        isPosting: false,
      });
    }
  };

  public render(): JSX.Element {
    const { isPosting } = this.state;

    return (
      <Styled styles={styles} tag="form" onSubmit={this.postProject}>
        <Button
          label="back"
          iconLeft={mdiArrowLeft}
          size="small"
          className="back"
          href="/"
        />

        <h1>
          <Icon
            icon={mdiOfficeBuilding}
            color={EAppColors.PRIMARY_TEXT}
            width={50}
          />
          Post your project
        </h1>

        <p>You are looking for cofounders. Advertise yourself on OkFounder.</p>

        <InputGroup title="Who are you?">
          <Input
            required
            label="Your first name *"
            placeholder="John"
            name={EProjectKeys.FIRSTNAME}
          />
          <Input
            required
            label="Your last name *"
            placeholder="doe"
            name={EProjectKeys.LASTNAME}
          />
          <Input
            required
            label="Your email *"
            type="email"
            placeholder="john.doe@mail.com"
            name={EProjectKeys.EMAIL}
          />
          <Input
            label="Your LinkedIn URL"
            type="url"
            name={EProjectKeys.LINKEDIN}
            placeholder="https://www.linkedin.com/in/john-doe/"
          />
          <Input
            required
            name={EProjectKeys.SKILLSET}
            label="Your skillset *"
            placeholder="accounting, python, scrum management..."
          />
        </InputGroup>

        <InputGroup title="What do you want to do?">
          <Input
            required
            label="Project Name *"
            type="textarea"
            placeholder="Find a catchy name!"
            name={EProjectKeys.NAME}
          />
          <Input
            required
            label="Type of project *"
            type="textarea"
            placeholder="Web application, command line interface, restaurant, university..."
            name={EProjectKeys.TYPE}
          />
          <Input
            required
            label="Project description *"
            type="textarea"
            placeholder="What problem do you want to solve?"
            name={EProjectKeys.DESCRIPTION}
          />
          <Input
            required
            label="What do you need *"
            placeholder="Describe your perfect co-founder"
            type="textarea"
            name={EProjectKeys.TARGET}
          />
        </InputGroup>

        <p>* required</p>

        <Button
          type="submit"
          label="Post my project"
          iconRight={mdiArrowRight}
          isLoading={isPosting}
        />
      </Styled>
    );
  }
}
