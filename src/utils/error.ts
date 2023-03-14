import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ErrorDto } from '../api/types/ErrorDTO';
import { plainToInstance } from 'class-transformer';

export const formatGraphQLError = () => {
  return (exception: GraphQLError): GraphQLFormattedError => {

    if (exception.extensions.exception.validationErrors) {
      return formatValidateError(exception.extensions.exception.validationErrors[0]);
    }

    const errors =
      (exception?.extensions?.exception)?.message ||
      exception.message;

    return formatError(
      { message: errors },
    ) as GraphQLFormattedError;
  };
};

export const formatError = (
  error: ErrorDto,
): ErrorDto => {
  Object.assign(error, {
    message: error.message,
  });

  return plainToInstance(ErrorDto, error);
};

export const formatValidateError = ({ property, constraints }) => {
  return formatError({
    property,
    message: Object.values(constraints)[0] as string,
  }) as GraphQLFormattedError;
}