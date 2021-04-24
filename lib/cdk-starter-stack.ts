import * as apigateway from '@aws-cdk/aws-apigateway';
import * as cdk from '@aws-cdk/core';

export class MyCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const restApi = new apigateway.RestApi(this, 'api', {
      description: 'example-api',
      // 👇 set up CORS
      defaultCorsPreflightOptions: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowCredentials: true,
        allowOrigins: ['http://localhost:3000'],
      },
    });

    // 👇 add a resource with 2 methods for demo purposes
    const todos = restApi.root.addResource('todos');
    todos.addMethod('GET');
    todos.addMethod('POST');
  }
}
