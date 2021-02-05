import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AppHeader from "@saleor/components/AppHeader";
import CardTitle from "@saleor/components/CardTitle";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import Skeleton from "@saleor/components/Skeleton";
import { commonMessages } from "@saleor/intl";
import ProductMediaVideo from "@saleor/products/components/ProductMediaVideo/ProductMediaVideo";
import { ProductMediaType } from "@saleor/types/globalTypes";
import React from "react";
import { useIntl } from "react-intl";

import ProductMediaNavigation from "../ProductMediaNavigation";

const useStyles = makeStyles(
  theme => ({
    image: {
      height: "100%",
      objectFit: "contain",
      width: "100%"
    },
    imageContainer: {
      background: "#ffffff",
      border: "1px solid #eaeaea",
      borderRadius: theme.spacing(),
      margin: `0 auto ${theme.spacing(2)}px`,
      maxWidth: 552,
      padding: theme.spacing(2)
    }
  }),
  { name: "ProductMediaPage" }
);

interface ProductMediaPageProps {
  mediaObj?: {
    id: string;
    alt: string;
    url: string;
    type: string;
  };
  media?: Array<{
    id: string;
    url: string;
  }>;
  disabled: boolean;
  product: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onDelete: () => void;
  onRowClick: (id: string) => () => void;
  onSubmit: (data: { description: string }) => void;
}

const ProductMediaPage: React.FC<ProductMediaPageProps> = props => {
  const {
    disabled,
    mediaObj,
    media,
    product,
    saveButtonBarState,
    onBack,
    onDelete,
    onRowClick,
    onSubmit
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  return (
    <Form
      initial={{ description: mediaObj ? mediaObj.alt : "" }}
      onSubmit={onSubmit}
      confirmLeave
    >
      {({ change, data, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>{product}</AppHeader>
          <PageHeader
            title={intl.formatMessage({
              defaultMessage: "Edit Media",
              description: "header"
            })}
          />
          <Grid variant="inverted">
            <div>
              <ProductMediaNavigation
                disabled={disabled}
                media={media}
                highlighted={media ? mediaObj.id : undefined}
                onRowClick={onRowClick}
              />
              <Card>
                <CardTitle
                  title={intl.formatMessage({
                    defaultMessage: "Media Information",
                    description: "section header"
                  })}
                />
                <CardContent>
                  <TextField
                    name="description"
                    label={intl.formatMessage(commonMessages.description)}
                    helperText={intl.formatMessage({
                      defaultMessage: "Optional",
                      description: "field is optional"
                    })}
                    disabled={disabled}
                    onChange={change}
                    value={data.description}
                    multiline
                    fullWidth
                  />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardTitle
                  title={intl.formatMessage({
                    defaultMessage: "Media View",
                    description: "section header"
                  })}
                />
                <CardContent>
                  {!!mediaObj ? (
                    mediaObj?.type !== ProductMediaType.IMAGE ? (
                      <ProductMediaVideo
                        className={classes.image}
                        video={mediaObj}
                        fullWidth
                      />
                    ) : (
                      <div className={classes.imageContainer}>
                        <img
                          className={classes.image}
                          src={mediaObj.url}
                          alt={mediaObj.alt}
                        />
                      </div>
                    )
                  ) : (
                    <Skeleton />
                  )}
                </CardContent>
              </Card>
            </div>
          </Grid>
          <SaveButtonBar
            disabled={disabled || !onSubmit || !hasChanged}
            state={saveButtonBarState}
            onCancel={onBack}
            onDelete={onDelete}
            onSave={submit}
          />
        </Container>
      )}
    </Form>
  );
};
ProductMediaPage.displayName = "ProductMediaPage";
export default ProductMediaPage;
